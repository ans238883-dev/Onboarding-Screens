package com.example.myapplication;

import android.os.Bundle;
import android.text.TextUtils;
import android.util.Patterns;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.myapplication.databinding.Fragment2Binding;

public class Fragment2 extends Fragment {

    public interface OnUserInfoSubmitListener {
        void onUserInfoSubmitted(String name, String email, String gender,
                                 String age, String university);
    }

    private Fragment2Binding binding;
    private OnUserInfoSubmitListener listener;

    @Override
    public void onAttach(@NonNull android.content.Context context) {
        super.onAttach(context);
        if (context instanceof OnUserInfoSubmitListener) {
            listener = (OnUserInfoSubmitListener) context;
        } else {
            throw new RuntimeException(context + " must implement OnUserInfoSubmitListener");
        }
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        binding = Fragment2Binding.inflate(inflater, container, false);
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(
                requireContext(), R.array.gender_options,
                android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        binding.spinnerGender.setAdapter(adapter);

        binding.buttonFragment2Continue.setOnClickListener(v -> submitInfo());
        return binding.getRoot();
    }

    private void submitInfo() {
        String name = binding.editName.getText().toString().trim();
        String email = binding.editEmail.getText().toString().trim();
        String gender = binding.spinnerGender.getSelectedItem().toString();
        String age = binding.editAge.getText().toString().trim();
        String university = binding.editUniversity.getText().toString().trim();

        if (TextUtils.isEmpty(name)) {
            binding.editName.setError("Please enter your name");
            binding.editName.requestFocus();
            return;
        }
        if (!TextUtils.isEmpty(email) && !Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            binding.editEmail.setError("Please enter a valid email address");
            binding.editEmail.requestFocus();
            return;
        }
        if (listener != null) {
            listener.onUserInfoSubmitted(name, email, gender, age, university);
        }
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

    @Override
    public void onDetach() {
        super.onDetach();
        listener = null;
    }
}
