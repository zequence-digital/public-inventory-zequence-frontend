import { z } from "zod";

// {
//     "success": true,
//     "message": "Successful operation",
//     "data": {
//         "meta": {
//             "pageNumber": 1,
//             "pageSize": 10,
//             "pageCount": 1,
//             "totalCount": 1,
//             "numberOfPages": 1
//         },
//         "records": [
//             {
//                 "guid": "43ed44ff3c1f48e49b98827b3d4bf36f",
//                 "referenceNumber": "PDT1727199816796",
//                 "createdBy": "echinnannachukwuemeka@gmail.com",
//                 "updatedBy": null,
//                 "deletedBy": null,
//                 "category": {
//                     "name": "Beverages",
//                     "guid": "4d495ea0e8d944359a930d118f131b2f"
//                 },
//                 "status": "RUNNING_OUT",
//                 "name": "Milo",
//                 "branch": "Allen",
//                 "description": null,
//                 "photoLink": null,
//                 "notes": "Take note of this",
//                 "tags": "",
//                 "quantity": 1,
//                 "threshold": 30,
//                 "deleted": false,
//                 "createdAt": "2024-09-24T18:43:36.796923",
//                 "updatedAt": null,
//                 "deletedAt": null
//             }
//         ]
//     }
// }

export const AllProductSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    meta: z.object({
      pageNumber: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      totalCount: z.number(),
      numberOfPages: z.number(),
    }),
    records: z.array(
      z.object({
        guid: z.string(),
        referenceNumber: z.string(),
        createdBy: z.string(),
        updatedBy: z.string().nullable(),
        deletedBy: z.string().nullable(),
        category: z.object({
          name: z.string(),
          guid: z.string(),
        }),
        status: z.string(),
        name: z.string(),
        branch: z.string(),
        description: z.string().nullable(),
        photoLink: z.string().nullable(),
        notes: z.string(),
        tags: z.string(),
        quantity: z.number(),
        threshold: z.number(),
        deleted: z.boolean(),
        createdAt: z.string(),
        updatedAt: z.string().nullable(),
        deletedAt: z.string().nullable(),
      }),
    ),
  }),
});
