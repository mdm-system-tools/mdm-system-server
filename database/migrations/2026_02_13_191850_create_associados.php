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
            $table->char('RG', 9)->unique();
            $table->char('CPF', 11)->unique();
            $table->string('estado_civil', 20);
            $table->boolean('status')->default(1);

            $table->char('NIS', 11)->unique();
            $table->char('cras', 11)->unique();
            $table->string('email', 100)->unique();

            $table->date('data_de_nascimento');
            $table->decimal('renda_familiar', 10);
            // TODO Apenas data (dd/mm/yyyy)
            $table->date('data_de_inscricao');

            $table->binary("documento_img")->nullable();
            $table->binary("certidao_img")->nullable();
            $table->foreignId("dependente_id")->nullable();
            $table->foreignId("grupo_id")->nullable();

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
