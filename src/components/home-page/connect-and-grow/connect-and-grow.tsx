import Image from "next/image";

export function ConnectAndGrow() {
  return (
    <div
      id="features"
      className="flex flex-col max-w-[1200px] w-full px-8 justify-center items-center mx-auto mt-20"
    >
      <div className=" flex flex-col items-center justify-center mx-auto gap-3">
        <div className="text-center text-black lg:text-5xl max-w-[700px] w-full lg:leading-[57.60px] md:text-4xl text-3xl font-bold">
          Streamline, connect, and grow with Zequence inventory
        </div>
        <div className=" mb-16">
          <picture>
            <img src="/images/connect.svg" alt="Connect" />
          </picture>
        </div>
      </div>
      <div className=" grid grid-cols-two max-w-[1200px] w-full gap-6">
        <div className=" space-y-6">
          <Image
            width={800}
            height={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="/images/organizations.svg"
            alt="Organizations"
          />
          <Image
            width={800}
            height={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="/images/imports.svg"
            alt="Imports"
          />
        </div>
        <div className=" space-y-6">
          <Image
            width={800}
            height={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="/images/scale.svg"
            alt="Scale"
          />
          <Image
            width={800}
            height={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="/images/collaborate.svg"
            alt="Collaborate"
          />
        </div>
      </div>
    </div>
  );
}
