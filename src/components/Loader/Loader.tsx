import { FC } from 'react';
import { Circles } from 'react-loader-spinner';

interface Props {
  isLoading: boolean;
}

const Loader: FC<Props> = ({ isLoading }) => {
  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center">
      <Circles
        height="80"
        width="80"
        color="#e75450"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={isLoading}
      />
    </div>
  );
};

export default Loader;
