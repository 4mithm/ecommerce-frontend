import Image from 'next/image';

// ... other imports and code ...

const UserImage = ({ link }) => {

      return (
            <div>
              {/* Display a fallback image or error message */}
              <Image src={"/avatar.png"}   width={250} height={250} alt={'avatar'}/>
            </div>)
  try {
    // Wrap the usage of Image component in the try block
    return (
      <div>
        {link && (
          <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
        )}
      </div>
    );
  } catch (error) {
    // Handle the error, you can log it or display a fallback image
    console.error('Error loading image:', error);
    return (
      <div>
        {/* Display a fallback image or error message */}
        <Image src={"/avatar.png"}   width={250} height={250} alt={'avatar'}/>
      </div>
    );
  }
};

export default UserImage;
