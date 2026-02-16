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
        Schema::create('pagamentos', function (Blueprint $table) {
            $table->unsignedBigInteger('id');
            $table->unsignedBigInteger('numero_inscricao');

            $table->decimal('valor', 5, 2);
            $table->string('mes_de_referencia', 7);

            $table->foreignId('comprovante_id')->constrained('anexos');

            $table->primary(['id', 'numero_inscricao']);

            $table->foreign('numero_inscricao')
                ->references('numero_inscricao')
                ->on('associados')
                ->onDelete('cascade');

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
