<?php
namespace App\Utils;

use Illuminate\Support\Carbon;

class Formatador
{
    public  static function saudacaoPorHorario($horario = null)
    {
        $hora = $horario ? Carbon::parse($horario) : Carbon::now();
        $h = $hora->format('H:i');

        if ($h >= '00:00' && $h < '12:00') {
            return "Manhã 09:00";
        } elseif ($h >= '12:00' && $h < '18:00') {
            return "Tarde 13:00";
        } else {
            return "Noite 18:00";
        }
    }

    public static function formatNumInscricao($num_inscricao): string
    {
        return substr_replace($num_inscricao, '-', -2, 0);
    }

    public static function formatCPF($cpf): string
    {
        return preg_replace("/(\d{3})(\d{3})(\d{3})(\d{2})/", "$1.$2.$3-$4", $cpf);
    }

    public static function formatRG($rg): string
    {
        return preg_replace("/(\d{2})(\d{3})(\d{3})([\dxX])/", "$1.$2.$3-$4", $rg);
    }

    public static function formatNis($nis): string
    {
        return preg_replace("/(\d{3})(\d{5})(\d{2})(\d{1})/", "$1.$2.$3-$4", $nis);
    }

    public static function formatCras($cras): string
    {
        return preg_replace("/(\d{3})(\d{2})(\d{1})(\d{1})/", "$1.$2-$3/$4", $cras);
    }

    public static function formatCep($cep): string
    {
        return preg_replace("/(\d{5})(\d{3})/", "$1-$2", $cep);
    }

    public static function formatValueBR($value): string
    {
        return "R$ " . number_format($value, 2, ',', '.');
    }

    public static function formatDateToDayMonthYear($date): string
    {
        return $date ? Carbon::parse($date)->format('d/m/Y') : '';
    }

    public static function formatDateToHoursMinutes($date): string
    {
        return $date ? Carbon::parse($date)->format('H:i') : '';
    }
}
