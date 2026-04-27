<?php

namespace App\Http\Controllers;

use App\Http\Requests\LocalRequest;
use App\Http\Requests\StoreLocalRequest;
use App\Http\Requests\UpdateLocalRequest;
use App\Http\Resources\LocalResource;
use App\Models\Local;
use Exception;

class LocalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return LocalResource::collection(Local::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLocalRequest $request)
    {
        try {
            $local = Local::create($request->validated());
            return response()->json(new LocalResource($local), 201);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Local $local)
    {
        return new LocalResource($local);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLocalRequest $request, Local $local)
    {
        try {
            if ($local->update($request->validated())) {
                return response()->json(new LocalResource($local));
            }
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Local $local)
    {
        try {
            $localCopy = new LocalResource($local);
            if ($local->delete()) {
                return response()->json($localCopy);
            }
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }
    public function activate(Local $local)
    {
        try {
            if ($local->update(['status' => true])) {
                return response()->json(new LocalResource($local));
            }
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    public function deactivate(Local $local)
    {
        try {
            if ($local->update(['status' => false])) {
                return response()->json(new LocalResource($local));
            }
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }
}
