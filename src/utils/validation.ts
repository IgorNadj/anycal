import { type MutationOptions, useMutation } from "@tanstack/react-query";
import type { MutateFunction } from "@tanstack/query-core";

type ValidationError = {
  success: false;
  error: {
    code: string;
    message: string;
    field?: string;
  };
};

type Ok<TSuccessType> = {
  success: true;
  data: TSuccessType;
};

type Result<TSuccessType> = ValidationError | Ok<TSuccessType>;

export const ok = <T>(data: T): Ok<T> => {
  return {
    success: true,
    data,
  };
};

export const validationError = ({
  code,
  message,
  field,
}: ValidationError["error"]): ValidationError => {
  return {
    success: false,
    error: {
      code,
      message,
      field,
    },
  };
};

export const validated = <TSuccessType>(result: Result<TSuccessType>): TSuccessType => {
  if (!result.success) {
    throw result.error;
  }
  return result.data;
};

type UseValidatedMutationOptions<TSuccessType, TError, TVariables, TContext> =
  MutationOptions<TSuccessType, TError, TVariables, TContext> & {
    validatedMutationFn: (
      ...args: Parameters<MutateFunction<TSuccessType, TError, TVariables, TContext>>
    ) => Promise<Result<TSuccessType>>;
  };

// type ArgumentTypes = Parameters<typeof exampleFunction>

export const useValidatedMutation = <TSuccessType, TError, TVariables, TContext>(
  options: UseValidatedMutationOptions<TSuccessType, TError, TVariables, TContext>,
) => {
  // const typedOnSuccess = options.onSuccess as (data: TData) => void;

  const newMutationFn = async (
    ...args: Parameters<MutateFunction<TSuccessType, TError, TVariables, TContext>>
  ) => {
    const result = await options.validatedMutationFn(...args);
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  };

  const underlyingHookValues = useMutation({
    ...options,
    mutationFn: newMutationFn,
  });

  const typedError = underlyingHookValues.error as ValidationError["error"] | null;

  return {
    ...underlyingHookValues,
    error: typedError,
  };
};
