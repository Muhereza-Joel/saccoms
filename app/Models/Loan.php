<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Ramsey\Uuid\Uuid;

class Loan extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'uuid';

    protected $fillable = [
        'member_id',
        'loan_type',
        'loan_plan',
        'reference_number',
        'principal_amount',
        'interest_rate',
        'repayment_period',
        'repayment_schedule',
        'collateral',
        'status',
        'approval_date',
        'disbursement_date',
        'due_date',
        'outstanding_balance',
        'loan_officer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->id) {
                $model->id = Uuid::uuid4();
            }
        });
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function repayment_schedule()
    {
        return $this->hasMany(RepaymentSchedule::class);
    }

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id', 'id');
    }

    public function loan_type()
    {
        return $this->belongsTo(LoanType::class, 'loan_type', 'id');
    }

    public function loan_plan()
    {
        return $this->belongsTo(LoanPlan::class, 'loan_plan', 'id');
    }
}
