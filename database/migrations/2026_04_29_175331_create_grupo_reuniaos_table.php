<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('grupo_reuniaos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reuniao_id')->constrained('reunioes')->cascadeOnDelete();
            $table->foreignId('grupo_id')->constrained('grupos')->cascadeOnDelete();
            $table->boolean('concluida')->default(false);
            $table->timestamps();

            $table->unique(['reuniao_id', 'grupo_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('grupo_reuniaos');
    }
};
