import { useRouter } from 'next/router';
import React, { FormEventHandler, useState } from 'react';
import Field from '../components/Field';
import Input from '../components/Input';
import Page from '../components/Page';

const SigninPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
  };
  return (
    <Page title="Sign In">
      <form>
        <Field label="Email">
          <Input
            type={'email'}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Password">
          <Input
            type={'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
      </form>
    </Page>
  );
};

export default SigninPage;
