package com.example.mobile

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.mobile.api.*
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class DashboardActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard)

        val tvWelcome = findViewById<TextView>(R.id.tvWelcome)
        val tvEmail = findViewById<TextView>(R.id.tvEmail)
        val tvFullName = findViewById<TextView>(R.id.tvFullName)
        val btnLogout = findViewById<Button>(R.id.btnLogout)

        val token = getSharedPreferences("AUTH", MODE_PRIVATE).getString("JWT", "")

        // Retrofit setup...
        val service = Retrofit.Builder()
            .baseUrl("http://10.0.2.2:8080/")
            .addConverterFactory(GsonConverterFactory.create())
            .build().create(AuthService::class.java)

        // Fetch User Info
        service.getProfile(token!!).enqueue(object : retrofit2.Callback<UserProfile> {
            override fun onResponse(call: retrofit2.Call<UserProfile>, response: retrofit2.Response<UserProfile>) {
                if (response.isSuccessful) {
                    val user = response.body()
                    tvWelcome.text = "Welcome back, ${user?.fullName}!"
                    tvEmail.text = user?.email
                    tvFullName.text = user?.fullName
                }
            }
            override fun onFailure(call: retrofit2.Call<UserProfile>, t: Throwable) {}
        })

        btnLogout.setOnClickListener {
            getSharedPreferences("AUTH", MODE_PRIVATE).edit().clear().apply()
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }
}

