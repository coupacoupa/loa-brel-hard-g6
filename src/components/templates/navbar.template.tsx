import ModalOrganism from "../organism/modal.organism";
import NavbarOrganism from "../organism/navbar.organism";

export default () => {
  return (
    <>
      <NavbarOrganism />
      <ModalOrganism id="how-to-use-modal">
        <>
          <h1 className="mb-4 hidden text-center text-base font-medium sm:text-3xl md:block">
            How to use
          </h1>
          <div className="hidden md:block">
            <ol>
              <li>1) Click START when yellow meteor first destoy tiles</li>
              <li>2) Click on tile to drop blue meteor</li>
              <li>3) Blue Input indicates how many blue meteor to drop</li>
              <li>4) Click yellow buttons to drop yellow meteor</li>
              <li>5) Enable autocopy to copy placement on recommendations</li>
              <li>6) Click RESET to reset raid</li>
            </ol>
          </div>
        </>
      </ModalOrganism>
    </>
  );
};
