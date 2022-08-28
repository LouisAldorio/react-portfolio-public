import { useState,useEffect } from 'react'

export const useForm = (callback,initialState = {}) => {
    const [values, setValues] = useState(initialState)

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    }
}



export const useScript = url => {
    console.log(url)
    useEffect(() => {
      const script = document.createElement('script');

      script.src = url;
      script.async = true;
      script.defer = true

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      }
    }, [url]);
};
