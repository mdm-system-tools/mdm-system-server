<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Validator;

class AuthController extends Controller
{
    public function setPassword(Request $request)
    {
        Validator::make($request->all(), [
            'email' => 'required|string|email|max:255|exists:users,email',
            'password' => 'required|string|min:6|confirmed',
        ])->validated();

        try {
            $user = User::where("email", $request->email)->firstOrFail();
            $user->update([
                "password" => Hash::make($request->password)
            ]);

            return response()->json("Senha alterada com sucesso $user");
        } catch (ValidationException $e) {
            throw ValidationException::withMessages([
                "password" => "senha invalida {${$e->getMessage()}}"
            ]);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);

        //TODO Desativado validação de email
//        $request->user()->sendEmailVerificationNotification(); porque isso esta aqui ? sem antes verifica ? hasEmailVeirify()

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = User::where('email', $request->email)->firstOrFail();

            if (!$user || !Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }

            //TODO Desativado validação de email
//            if ($user->email_verified_at == null) {
//                throw ValidationException::withMessages([
//                    'email' => ['email não verificado, seque a sua caixa de entrada.'],
//                ]);
//            }

            return response()->json([
                "token" => $user->createToken($request->device_name)->plainTextToken,
                'userId' => $user->id,
            ]);
        }

        return response()->json("Unauthorized", 403);
    }

    public function register(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ])->validated();
        try {
            $user = User::create($valid);

            //TODO Desativado validação de email
            //$user->sendEmailVerificationNotification();

            return response()->json('Usuário criado! Verifique seu e-mail.', 201);
        } catch (ValidationException $e) {
            return response()->json($e->validator->errors(), 400);

        } catch (Exception $e) {
            return response()->json("Erro interno ao criar usuário: {${$e->getMessage()}}", 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(["message" => "usuario apagado com sucesso!"], ResponseAlias::HTTP_OK);
    }
}
