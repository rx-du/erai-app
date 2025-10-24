import { Controller, SubmitHandler } from 'react-hook-form';
import { useCallback } from 'react';
import { CustomButton } from '../../../Components/CustomButton';
import { Messages } from '../../../Constants/Messages';
import { CustomInput } from '../../../Components/CustomInput';
import PasswordInput from '../../../Components/CustomInput/PasswordInput';

type CustomTextInputProps = {
  form: any;
  onSubmit: SubmitHandler<any>;
};
type RenderInputProps = {
  field: {
    onChange: (value: string) => void;
    value: string;
    name: string;
  };
};

const PlaceholderInput: { [key: string]: string } = {
  username: Messages.enterEmail,
  password: Messages.enterPassword,
};

export function LoginForm({ form, onSubmit }: CustomTextInputProps) {
  const inputClickHandler = useCallback(
    (fieldName: any) => {
      form.clearErrors(fieldName);
    },
    [form]
  );
  const renderInput = useCallback(
    (props: RenderInputProps, secureTextEntry: boolean) => (
      <CustomInput
        error={form.formState.errors?.[props.field.name]}
        onChangeText={props.field.onChange}
        value={props.field.value}
        name={props.field.name}
        placeholder={PlaceholderInput[props.field.name]}
        onInputClick={inputClickHandler}
        secureTextEntry={secureTextEntry}
      />
    ),
    [form.formState.errors, inputClickHandler]
  );

  const renderPasswordInput = useCallback(
    (props: RenderInputProps) => (
      <PasswordInput
        error={form.formState.errors?.[props.field.name]}
        onChangeText={props.field.onChange}
        value={props.field.value}
        name={props.field.name}
        placeholder={PlaceholderInput[props.field.name]}
        onInputClick={inputClickHandler}
      />
    ),
    [form.formState.errors, inputClickHandler]
  );

  return (
    <>
      <Controller
        control={form.control}
        render={({ field }) => renderInput({ field }, false)}
        name={Messages.username}
      />
      <Controller
        control={form.control}
        render={({ field }) => renderPasswordInput({ field })}
        name={Messages.password}
      />
      <CustomButton
        onPress={form.handleSubmit(onSubmit)}
        text="Login"
        type="primary"
        dimension="large"
        width={100}
      />
    </>
  );
}
