<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('associados', function (Blueprint $table) {
            $table->unsignedBigInteger('numero_inscricao')->primary();

            $table->string('nome', 100);
            $table->string('estado_civil', 20);
            $table->decimal('renda_familiar', 10)->nullable();

            $table->char('CPF', 11)->unique();
            $table->char('RG', 9)->unique()->nullable();
            $table->char('NIS', 11)->unique()->nullable();
            $table->char('cras', 11)->unique()->nullable();
            $table->string('email', 100)->unique()->nullable();

            $table->date('data_nascimento');
            $table->date('data_inscricao')->default(now()->format('Y-m-d'));

            $table->binary("documento_img")->nullable();
            $table->binary("certidao_img")->nullable();
            $table->foreignId("grupo_id")->nullable();

            $table->boolean('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('associado');
    }
};
