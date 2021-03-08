const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../app");
const model = require("../src/model");

const data = [
  {
    url:
      "https://images.pexels.com/photos/1152237/pexels-photo-1152237.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    owner: "Lisa Fotios",
  },
  {
    url:
      "https://images.pexels.com/photos/196643/pexels-photo-196643.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    owner: "picjumbo.com",
  },
  {
    url:
      "https://images.pexels.com/photos/1838607/pexels-photo-1838607.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    owner: "Elina Sazonova",
  },
];

const newImage = {
    url:
      "https://images.pexels.com/photos/1373915/pexels-photo-1373915.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    owner: "Lisa Fotios",
  };
describe("/images api", () => {
    before(() =>{
        model.collection.drop();
    });
  let images = [];

  it("add dummy data", (done)=>{
      model.addMultipleImages(data,(err, res) =>{
          images = res;
          expect(res).to.be.an('array').to.have.lengthOf(data.length);
          done();
    });
  });

  describe("insert images by posting /images", () => {
    let image;
    it("one image should be inserted", (done) => {
      request(app)
        .post("/images")
        .send({ url: newImage.url, owner: newImage.owner })
        .end((err, res) => {
          expect(res.status).to.eq(200);
          image = res.body;
          expect(res.body.url).to.eq(newImage.url);
          expect(res.body.owner).to.eq(newImage.owner);
          images.unshift(image);
          done();
        });
    });

    it("inserted image should have _id and addedOn", (done) => {
      expect(image).to.have.property("_id");
      expect(image).to.have.property("addedOn");
      done();
    });
  });

  describe("Get images from /images and /image/:search", () => {
    it("Get all 4 images for /images", (done) => {
      request(app)
        .get("/images/")
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.an("array").that.has.lengthOf(4);
          done();
        });
    });

    it("Get images by Lisa Fotios on /images/Lisa", (done) => {
      request(app)
        .get("/images/Lisa")
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.an("array").that.has.lengthOf(2);
          expect(res.body[0].owner).to.be.eq("Lisa Fotios");
          done();
        });
    });
  });

  describe("Delete images using /images/id", () => {
    it("Delete an image with provided id and password", (done) => {
      request(app)
        .delete("/images/" + images[0]._id)
        .set("Content-Type", "text/plain")
        .send("password")
        .end((err, res) => {
          expect(res.status).to.eq(200);
          expect(res.body.deletedCount).to.eq(1);
          images.shift();
          done();
        });
    });

    it("Get invalid password with wrong password", (done) => {
      request(app)
        .delete("/images/" + images[0]._id)
        .set("Content-Type", "text/plain")
        .send("pass")
        .end((err, res) => {
          expect(res.status).to.eq(401);
          done();
        });
    });
  });
});
