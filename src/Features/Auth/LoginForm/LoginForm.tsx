import { Controller, SubmitHandler } from 'react-hook-form';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../../Components/CustomButton';
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

export function LoginForm({ form, onSubmit }: CustomTextInputProps) {
  const { t } = useTranslation();

  const PlaceholderInput: { [key: string]: string } = {
    username: t('login.email'),
    password: t('login.password'),
  };
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
        name="username"
      />
      <Controller
        control={form.control}
        render={({ field }) => renderPasswordInput({ field })}
        name="password"
      />
      <CustomButton
        onPress={form.handleSubmit(onSubmit)}
        text={t('login.loginButton')}
        type="primary"
        dimension="large"
        width={100}
      />
    </>
  );
}
