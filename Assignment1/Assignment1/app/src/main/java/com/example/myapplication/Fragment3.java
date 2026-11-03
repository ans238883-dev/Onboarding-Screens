package com.example.myapplication;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.myapplication.databinding.Fragment3Binding;

public class Fragment3 extends Fragment {

    public static final String ARG_USER_NAME = "user_name";

    public interface OnAgreementChangeListener {
        void onAgreementChanged(boolean isChecked);
    }

    private Fragment3Binding binding;
    private OnAgreementChangeListener listener;

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        if (context instanceof OnAgreementChangeListener) {
            listener = (OnAgreementChangeListener) context;
        } else {
            throw new RuntimeException(context + " must implement OnAgreementChangeListener");
        }
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        binding = Fragment3Binding.inflate(inflater, container, false);
        String name = getArguments() != null
                ? getArguments().getString(ARG_USER_NAME, "there") : "there";
        binding.textWelcomeName.setText("Welcome, " + name + "!");

        binding.buttonFinish.setEnabled(false);
        binding.buttonFinish.setText("Continue");
        binding.checkboxAgreement.setOnCheckedChangeListener((buttonView, isChecked) -> {
            if (listener != null) {
                listener.onAgreementChanged(isChecked);
            }
        });
        return binding.getRoot();
    }

    public void updateFinishButton(boolean isChecked) {
        if (binding != null) {
            binding.buttonFinish.setEnabled(isChecked);
            binding.buttonFinish.setText(isChecked ? "Finish" : "Continue");
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
