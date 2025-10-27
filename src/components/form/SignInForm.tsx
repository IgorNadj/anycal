import { Alert, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router";
import { useLogin } from "../../hooks/useLogin.ts";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const useLoginMutation = useLogin();
  const { mutate: login, error, isSuccess, isPending } = useLoginMutation;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login({
      email: email.trim(),
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ mt: 1, maxWidth: 400 }}>
        {error && <Alert severity="error">{error.message}</Alert>}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
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
          Sign in
        </Button>
        {isSuccess && (
          <Alert severity="success">
            You are now signed in. <Link to="/">Continue</Link>
          </Alert>
        )}
      </Stack>
    </form>
  );
};
