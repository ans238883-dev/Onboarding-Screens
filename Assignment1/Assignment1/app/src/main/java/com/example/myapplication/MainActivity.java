package com.example.myapplication;

import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import com.example.myapplication.databinding.ActivityMainBinding;

public class MainActivity extends AppCompatActivity implements
        Fragment2.OnUserInfoSubmitListener,
        Fragment3.OnAgreementChangeListener {

    private ActivityMainBinding binding;
    private Fragment3 fragment3;
    private String userName = "";
    private String userEmail = "";
    private String userGender = "";
    private String userAge = "";
    private String userUniversity = "";
    private int currentScreen = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        if (savedInstanceState == null) {
            getSupportFragmentManager().beginTransaction()
                    .replace(R.id.fragment_container, new Fragment1())
                    .commit();
        }

        binding.buttonContinue.setOnClickListener(v -> {
            if (currentScreen == 1) {
                showFragment2();
            }
        });
    }

    private void showFragment2() {
        currentScreen = 2;
        binding.buttonContinue.setVisibility(View.GONE);
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.fragment_container, new Fragment2())
                .addToBackStack("fragment2")
                .commit();
    }

    @Override
    public void onUserInfoSubmitted(String name, String email, String gender,
                                    String age, String university) {
        userName = name;
        userEmail = email;
        userGender = gender;
        userAge = age;
        userUniversity = university;

        Bundle args = new Bundle();
        args.putString(Fragment3.ARG_USER_NAME, userName);
        fragment3 = new Fragment3();
        fragment3.setArguments(args);

        currentScreen = 3;
        getSupportFragmentManager().beginTransaction()
                .replace(R.id.fragment_container, fragment3)
                .addToBackStack("fragment3")
                .commit();
    }

    @Override
    public void onAgreementChanged(boolean isChecked) {
        if (fragment3 != null) {
            fragment3.updateFinishButton(isChecked);
        }
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Fragment visible = getSupportFragmentManager().findFragmentById(R.id.fragment_container);
        if (visible instanceof Fragment1 || visible == null) {
            currentScreen = 1;
            binding.buttonContinue.setVisibility(View.VISIBLE);
        } else if (visible instanceof Fragment2) {
            currentScreen = 2;
            binding.buttonContinue.setVisibility(View.GONE);
        } else {
            currentScreen = 3;
            binding.buttonContinue.setVisibility(View.GONE);
        }
    }
}
