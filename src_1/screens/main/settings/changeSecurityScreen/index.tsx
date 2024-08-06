import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { tabBarHeight } from '../../../../theme';
import { updateSecurityQuestions } from '../../../../api/apiInstance'; // Import the API function

export default function ChangeSecurityScreen() {
  const initialQuestions = [
    { id: 1, question: 'What is your mother’s maiden name?', answer: '', editing: false },
    { id: 2, question: 'What was your first pet’s name?', answer: '', editing: false },
    { id: 3, question: 'What was the make and model of your first car?', answer: '', editing: false },
    { id: 4, question: 'In what city were you born?', answer: '', editing: false },
    { id: 5, question: 'What high school did you attend?', answer: '', editing: false },
  ];

  const [questions, setQuestions] = useState(initialQuestions);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleEdit = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, editing: true } : q
      )
    );
  };

  const handleChangeAnswer = (id, text) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, answer: text } : q
      )
    );
  };

  const checkFormValidity = () => {
    const allAnswered = questions.every(q => q.answer.trim() !== '');
    setIsFormValid(allAnswered);
  };

  useEffect(() => {
    checkFormValidity();
  }, [questions]);

  const handleSubmit = async (values) => {
    console.log('Submitting form with values:', values);
    try {
      await updateSecurityQuestions(values.questions);
      console.log('Security questions updated successfully');
    } catch (error) {
      console.error('Error updating security questions:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{ questions }}
        validationSchema={Yup.object().shape({
          questions: Yup.array().of(
            Yup.object().shape({
              answer: Yup.string().required('Answer is required'),
            })
          ),
        })}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleSubmit: formikHandleSubmit, values, isValid }) => (
          <View style={{ flex: 1, width: '100%', marginBottom: tabBarHeight }}>
            {values.questions.map((q, index) => (
              <View key={q.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.questionNumber}>QUESTION {index + 1} OF 5</Text>
                  <TouchableOpacity onPress={() => handleEdit(q.id)}>
                    <Text style={styles.changeText}>CHANGE</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.questionText}>{q.question}</Text>
                <View style={styles.separator} />
                {q.editing ? (
                  <TextInput
                    style={styles.textInput}
                    value={q.answer}
                    placeholder="Answer"
                    onChangeText={(text) => handleChangeAnswer(q.id, text)}
                    onBlur={() => {
                      handleEdit(q.id);
                      checkFormValidity();
                    }}
                  />
                ) : (
                  <TouchableOpacity onPress={() => handleEdit(q.id)}>
                    <Text style={styles.answerText}>{q.answer || 'Answer'}</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: isFormValid ? 'blue' : 'gray' }]}
              onPress={() => {
                console.log('Submit button pressed'); // Debugging statement
                formikHandleSubmit(); // Use Formik's handleSubmit
              }}
              disabled={!isFormValid}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  questionNumber: {
    fontWeight: 'bold',
  },
  changeText: {
    color: 'red',
  },
  questionText: {
    marginBottom: 8,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  answerText: {
    color: '#555',
  },
  submitButton: {
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16, // Add margin to separate from the questions
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
