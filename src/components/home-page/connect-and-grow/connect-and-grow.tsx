import { ViewCardDescription } from "./view-card-description";

export function ConnectAndGrow() {
  return (
    <div
      id="features"
      className="flex flex-col px-8 justify-center items-center mx-auto mt-20"
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
      <div className=" grid grid-auto-fit-xl items-center justify-center max-w-[1200px] w-full gap-6">
        <div className=" space-y-6">
          <ViewCardDescription
            src="/images/multiple.svg"
            alt="Multiple organizations"
            className="min-h-[700px]"
            heading="Create multiple organizations"
            description="Set up and manage multiple businesses or branches within a single platform. Customize settings for each organization to match your unique operational needs."
          />
          <ViewCardDescription
            src="/images/scale.svg"
            alt="Scale your business with ease"
            hasTopBadge
            className="min-h-[580px]"
            heading="Scale your business with ease"
            description="As your business grows, our flexible system grows with you. Easily add new products, locations, or features without disrupting your operations."
          />
        </div>
        <div className=" space-y-6">
          <ViewCardDescription
            isPositionedLeft
            src="/images/import-files.svg"
            alt="Import files and export reports easily"
            className="min-h-[580px]"
            heading="Import files and export reports easily"
            description="Seamlessly upload existing inventory data and effortlessly generate comprehensive reports. Streamline your workflow with user-friendly import/export features."
          />
          <ViewCardDescription
            src="/images/collaborate.svg"
            alt="Collaborate with your teams"
            heading="Collaborate with your teams"
            description="Foster teamwork and boost productivity by giving your staff
            real-time access to inventory data. Set custom permissions and
            facilitate smooth communication across departments."
          />
        </div>
      </div>
    </div>
  );
}
