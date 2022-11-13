import { LockClosedIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import Cookies from 'universal-cookie';
import { PostAuthJWTCreate } from '../../types/types';

const cookie = new Cookies();
const apiBaseUrl = process.env.NEXT_PUBLIC_RESTAPI_URL;

const Auth = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const login = async () => {
    try {
      await fetch(`${apiBaseUrl}api/auth/jwt/create/`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.status === 400) {
            throw new Error('authentication failed');
          } else if (res.ok) {
            return res.json();
          }
          return true;
        })
        .then((data: PostAuthJWTCreate) => {
          const options = { path: '/' };
          cookie.set('access_token', data.access, options);
        });
      void router.push('/project-hp2/main-page');
    } catch (err) {
      alert(err);
    }
  };

  const authUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      void login();
    } else {
      try {
        await fetch(`${apiBaseUrl}api/register/`, {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (res.status === 400) {
            throw new Error('authentication failed');
          }
        });
        void login();
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <>
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            {isLogin ? 'Login' : 'Sign up'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={authUser}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <input
                name="username"
                type="text"
                autoComplete="username"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <span
                onMouseDown={() => setIsLogin(!isLogin)}
                tabIndex={0}
                role="button"
                className=" cursor-pointer font-medium text-white hover:text-indigo-500"
              >
                Change mode ?
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              {isLogin ? 'Login with JWT' : 'Create new user'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;
