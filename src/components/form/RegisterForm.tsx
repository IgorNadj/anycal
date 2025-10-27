import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRegister } from "../../hooks/useRegister.ts";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const useRegisterMutation = useRegister();
  const { mutate: register, error, isSuccess, isPending } = useRegisterMutation;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    register({ email: email.trim(), password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ mt: 1, maxWidth: 400 }}>
        <Typography variant="h6">Create account</Typography>
        {error && <Alert severity="error">{error.message}</Alert>}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          error={error?.field === "email"}
          helperText={error?.field === "email" ? error.message : undefined}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={isPending}>
          Create
        </Button>
        {isSuccess && (
          <Alert severity="success">
            Your account has been created. You are now signed in.
          </Alert>
        )}
      </Stack>
    </form>
  );
};
