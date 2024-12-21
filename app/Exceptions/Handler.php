<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        // Handle ValidationException
        if ($exception instanceof ValidationException) {
            if ($this->isApiRequest($request)) {
                // JSON response for API or SPA requests
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $exception->errors(),
                ], 422);
            }

            // Inertia or Web response
            return back()->withErrors($exception->errors())->withInput();
        }

        return parent::render($request, $exception);
    }

    /**
     * Determine if the request is an API request.
     *
     * @param \Illuminate\Http\Request $request
     * @return bool
     */
    protected function isApiRequest($request)
    {
        return $request->is('api/*') || $request->expectsJson();
    }
}
