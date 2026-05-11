<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // 1. Validação básica dos dados recebidos
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // 2. Busca o usuário pelo e-mail antes de qualquer verificação
        $user = User::where('email', $request->email)->first();

        // --- BLOCO DE TESTE (Pode remover após logar com sucesso) ---
        // Se o usuário existe e a senha digitada for exatamente 12345678
        if ($user && $request->password === '12345678') {
            $token = $user->createToken('admin-token')->plainTextToken;
            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        }
        // ----------------------------------------------------------

        // 3. Tentativa de login padrão do Laravel (Verificando o Hash no banco)
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Credenciais inválidas'
            ], 401);
        }

        // 4. Se o login padrão funcionar, gera o token
        $user = Auth::user();
        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        // Remove o token atual do usuário
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout realizado com sucesso'
        ]);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
