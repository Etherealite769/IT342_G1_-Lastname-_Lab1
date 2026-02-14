package com.example.mobile.api

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.GET
import retrofit2.http.Header

// Data classes matching your Backend Entities
data class LoginRequest(val email: String, val password: String)
data class RegisterRequest(val fullName: String, val email: String, val password: String)
data class AuthResponse(val token: String)
data class UserProfile(val fullName: String, val email: String, val role: String)

interface AuthService {
    @POST("api/auth/login")
    fun login(@Body request: LoginRequest): Call<AuthResponse>

    @POST("api/auth/register")
    fun register(@Body request: RegisterRequest): Call<Void>

    @GET("api/user/me")
    fun getProfile(@Header("Authorization") token: String): Call<UserProfile>
}

