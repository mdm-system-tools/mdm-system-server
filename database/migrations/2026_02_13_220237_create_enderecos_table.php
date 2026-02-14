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
        Schema::create('enderecos', function (Blueprint $table) {
            $table->unsignedSmallInteger('id');
            $table->unsignedSmallInteger('numero_inscricao');

            $table->primary(['id', 'numero_inscricao']);

            $table->char("CEP", 9);
            $table->char("rua", 150);
            $table->char("bairro", 100);
            $table->char("numero", 10);
            $table->char("municipio", 20);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enderecos');
    }
};
