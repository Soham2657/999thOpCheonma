/*
PURPOSE:
Custom hook for accessing AuthContext easily.
Instead of writing useContext(AuthContext) everywhere,
we just write: const { user } = useAuth()
*/

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  return useContext(AuthContext);
}