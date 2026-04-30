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
        Schema::create('pagamentos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('associado_id')->constrained();
            $table->foreignId('divida_id')->constrained();
            $table->date('data_pagamento')->nullable();
            $table->string('metodo_pagamento')->nullable();
            $table->enum('status', ['Pendente', 'Pago', 'Atrasado'])->default('Pendente');
            $table->binary('comprovante')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pagamentos');
    }
};
