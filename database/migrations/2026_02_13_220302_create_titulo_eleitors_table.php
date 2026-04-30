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
        Schema::create('titulo_eleitors', function (Blueprint $table) {
            $table->unsignedSmallInteger('titulo_eleitor');
            $table->unsignedSmallInteger('numero_inscricao');

            $table->primary(['titulo_eleitor', 'numero_inscricao']);

            $table->char('zona', 3);
            $table->char('sacao', 4);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('titulo_eleitors');
    }
};
