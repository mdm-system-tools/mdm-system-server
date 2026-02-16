<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reuniaos', function (Blueprint $table) {
            $table->id();
            $table->foreignId("local_id");
            $table->foreignId("projeto_id");

            $table->date("horario_inicio");
            $table->date("horario_fim");
            $table->date("data_marcada");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reuniaos');
    }
};
