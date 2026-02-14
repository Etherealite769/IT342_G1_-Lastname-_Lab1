package com.example.mobile

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.mobile.api.*
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val etEmail = findViewById<EditText>(R.id.etEmail)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val btnSignIn = findViewById<Button>(R.id.btnSignIn)

        // Setup Retrofit (Replace with your IP Address)
        val retrofit = Retrofit.Builder()
            .baseUrl("http://10.0.2.2:8080/") // 10.0.2.2 points to your localhost from Emulator
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val service = retrofit.create(AuthService::class.java)

        btnSignIn.setOnClickListener {
            val email = etEmail.text.toString()
            val pass = etPassword.text.toString()

            service.login(LoginRequest(email, pass)).enqueue(object : retrofit2.Callback<AuthResponse> {
                override fun onResponse(call: retrofit2.Call<AuthResponse>, response: retrofit2.Response<AuthResponse>) {
                    if (response.isSuccessful) {
                        val token = response.body()?.token
                        // Save token in SharedPreferences
                        getSharedPreferences("AUTH", MODE_PRIVATE).edit().putString("JWT", "Bearer $token").apply()

                        // Go to Dashboard
                        startActivity(Intent(this@LoginActivity, DashboardActivity::class.java))
                        finish()
                    } else {
                        Toast.makeText(this@LoginActivity, "Invalid Credentials", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: retrofit2.Call<AuthResponse>, t: Throwable) {
                    Toast.makeText(this@LoginActivity, "Server Error: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }
}

