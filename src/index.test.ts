// first ever test written on ts

describe("GET /info/:alias", () => {
  test("Unauthorized", async () => {
    const res = await fetch("http://localhost:3000/info/github");
    const body = await res.json();

    expect(res.status).toEqual(401);
    expect(body.message).toEqual("Unauthorized");
  });
  test("Unauthorized with unknown link", async () => {
    const res = await fetch("http://localhost:3000/info/gid");
    const body = await res.json();

    expect(res.status).toEqual(401);
    expect(body.message).toEqual("Unauthorized");
  });

  test("Authorized", async () => {
    const res = await fetch("http://localhost:3000/info/github", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.YIlcGLQO1YuArHLUSEK7hQNdpCZO4Lr-Tc0BidFPbLM",
      },
    });
    const body = await res.json();

    const getInfoTestResult = {
      link: {
        _id: "662b91a792f55fa1ec44f4be",
        link: "https://github.com/tinarao",
        alias: "github",
        authorID: "admin",
        createdAt: "2024-04-26T11:36:07.468Z",
        updatedAt: "2024-04-26T11:36:07.468Z",
        __v: 0,
      },
    };

    expect(res.status).toEqual(200);
    expect(body).toEqual(getInfoTestResult);
  });

  test("Authorized with unknown link", async () => {
    const res = await fetch("http://localhost:3000/info/gid", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.YIlcGLQO1YuArHLUSEK7hQNdpCZO4Lr-Tc0BidFPbLM",
      },
    });
    const body = await res.json();

    expect(res.status).toEqual(404);
    expect(body.message).toEqual("Ссылка не существует");
  });
});

describe("POST /shorten/", () => {
  test("Shorten a link", async () => {
    const link = `https://github.com/${new Date().getTime()}`;
    const alias = `test-${new Date().getTime()}`;

    const res = await fetch("http://localhost:3000/shorten", {
      method: "POST",
      body: JSON.stringify({
        link: link,
        alias: alias,
      }),
    });
    const body = await res.json();

    expect(res.status).toEqual(201);
    expect(body.doc.alias).toEqual(alias);
    expect(body.doc.link).toEqual(link);
  });
  test("Shorten w/o alias", async () => {
    const link = `https://github.com/${new Date().getTime()}`;

    const res = await fetch("http://localhost:3000/shorten", {
      method: "POST",
      body: JSON.stringify({
        link: link,
      }),
    });
    const body = await res.json();

    expect(res.status).toEqual(201);
    expect(body.doc.link).toEqual(link);
  });
});
