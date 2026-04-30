<?php

use App\Models\User;
use Illuminate\Support\Facades\Password;

test('email verify sends reset link for existing user', function () {
    Password::shouldReceive('sendResetLink')
        ->once()
        ->andReturn(Password::RESET_LINK_SENT);

    $user = User::factory()->create();

    $response = $this->postJson('/api/v1/email-verify', [
        'email' => $user->email,
    ]);

    $response->assertStatus(200)
        ->assertJson(['message' => 'Link de recuperação enviado para seu email.']);
});

test('email verify returns error for non-existing email', function () {
    $response = $this->postJson('/api/v1/email-verify', [
        'email' => 'naoexiste@example.com',
    ]);

    $response->assertStatus(404)
        ->assertJson(['message' => 'Email não encontrado.']);
});

test('email verify requires valid email', function () {
    $response = $this->postJson('/api/v1/email-verify', [
        'email' => 'invalid-email',
    ]);

    $response->assertStatus(422);
});
