import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

describe("When getting an organisation", () => {
    const { organisationApi } = ApiClientFactory.getAll();

    it("I can get my org", async () => {
        const allOrgs =
            await organisationApi.organisationControllerFindAllForUser();
        expect(allOrgs.length).toEqual(1);

        const myOrgById = await organisationApi.organisationControllerFindOne({
            uuid: allOrgs[0].uuid,
        });
        expect(allOrgs[0].id).toEqual(myOrgById.id);
    });
});
