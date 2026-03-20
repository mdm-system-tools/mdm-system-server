<?php

namespace App\Observers;

use App\Models\Divida;
use App\Models\Pagamento;
use Illuminate\Support\Facades\Log;

class DividaObserver
{
    /**
     * Handle the Divida "created" event.
     */
    public function created(Divida $divida): void
    {
        Log::info("observer criado chamado");
        foreach ($divida->projeto->grupos as $grupo) {
            foreach ($grupo->associados as $associado) {
                Pagamento::create([
                    'numero_inscricao' => $associado->numero_inscricao,
                    'divida_id'        => $divida->id,
                ]);
            }
        }
    }

    /**
     * Handle the Divida "updated" event.
     */
    public function updated(Divida $divida): void
    {
        //
    }

    /**
     * Handle the Divida "deleted" event.
     */
    public function deleted(Divida $divida): void
    {
        //
    }

    /**
     * Handle the Divida "restored" event.
     */
    public function restored(Divida $divida): void
    {
        //
    }

    /**
     * Handle the Divida "force deleted" event.
     */
    public function forceDeleted(Divida $divida): void
    {
        //
    }
}
