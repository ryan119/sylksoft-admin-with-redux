const passwordValid = {
  required: 'This field is required!',
  minLength: { value: 6, message: 'Your password should have at least 6 characters' },
}
const confirmPwValid = {
  validate: (value, formValues) => {
    if(formValues.newPassword !== value){
      return "Your passwords do no match!"
    }
  }
}
export {passwordValid, confirmPwValid}