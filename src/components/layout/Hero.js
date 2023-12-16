import Right from "@/components/icons/Right";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
          Timber is a type of wood which has been processed into beams and planks. It is also known as “lumber” in
          US and Canada. .&nbsp;
          <span className="text-lime">
            Timber
          </span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text e
            ver since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </p>
        <div className="flex gap-4 text-sm">
          <Link href="/products">
            <button className="flex justify-center bg-lime uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full">
              Order now
              <Right />
            </button>
          </Link>

        </div>
      </div>
      <div className="relative hidden md:block">
        <Image src={'/wood.png'} layout={'fill'} objectFit={'contain'} alt={'pizza'} />
      </div>
    </section>
  );
}