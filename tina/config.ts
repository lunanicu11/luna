import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "master";

export default defineConfig({
  clientId: process.env.TINA_CLIENT_ID!,
  branch:
    process.env.TINA_BRANCH! ||
    // custom branch env override
    process.env.VERCEL_GIT_COMMIT_REF! ||
    // Vercel branch env
    process.env.HEAD!,
  // Netlify branch env
  token: process.env.TINA_TOKEN!,
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "content",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            label: "Images for gallery",
            name: "images",
            list: true,
            ui: {
              itemProps: (item) => {
                // Field values are accessed by item?.<Field name>
                return { label: item?.title + " - " + item?.type };
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                isTitle: true,
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                // isTitle: true,
                required: true,
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "asset",
                label: "Asset",
                required: true,
              },
              {
                label: "Type",
                name: "type",
                type: "string",
                required: true,
                options: [
                  {
                    value: "main",
                    label: "main",
                  },
                  {
                    value: "sim",
                    label: "sim",
                  },
                  {
                    value: "details",
                    label: "details",
                  },
                ],
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "exhibition",
        label: "Exhibition",
        path: "content/exhibitions",
        defaultItem: () => {
          return {
            eventCategory: "exhibition",
            layout: "exhibition",
            date: new Date().toISOString(),
            endDate: "May 23, 1976",
            hour: "only for premium member",
            solo: true,
            org: "only for premium member",
          };
        },
        fields: [
          {
            label: "Draft",
            name: "draft",
            type: "boolean",
          },
          {
            label: "Title",
            name: "title",
            type: "string",
            isTitle: true,
            required: true,
            description:
              "Keep it Brief - this will become link (~60 characters)",
            ui: {
              validate: (value) => {
                if (value === "small caps please") {
                  return "Change with a meaningful name small caps";
                } else {
                  if (value?.length > 65) {
                    return "file name cannot be more than 65 characters long as it becomes link to the page";
                  }
                }
              },
            },
          },
          {
            label: "Subtitle",
            name: "sub_title",
            type: "string",
            required: true,
            description: "this will emphatised",
          },
          {
            label: "Date",
            name: "date",
            type: "datetime",
            description: "this should be today",
            ui: {
              component: "hidden",
            },
          },
          {
            label: "Start date",
            name: "startDate",
            type: "datetime",
            description: "when event starts",
          },

          {
            label: "Link to refferrence",
            name: "link",
            type: "string",
          },
          {
            label: "Place",
            name: "place",
            type: "string",
          },

          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            label: "Seo",
            name: "seo",
            type: "object",
            fields: [
              {
                label: "Title",
                name: "seo_title",
                type: "string",
                description:
                  "Title cannot be ~60 characters long as it becomes title of the page - (https://www.semrush.com/blog/title-tag/)",
                ui: {
                  validate: (value) => {
                    if (value?.length > 65) {
                      return "";
                    }
                  },
                },
              },
              {
                label: "Short name",
                name: "short_name",
                type: "string",
                description: "used in breadkrumbs -it will be deprecated",
              },
              {
                label: "👑 Description (for snippets)",
                name: "meta_description",
                type: "string",
                description:
                  "Premium Member Only - https://developers.google.com/search/docs/appearance/snippet#meta-descriptions",
                ui: {
                  component: "textarea",
                  validate: (value) => {
                    if (value?.length > 0) {
                      return "This field si only for Premium Member";
                    }
                  },
                },
              },
            ],
          },
          {
            label: "👑 Organised by",
            name: "org",
            type: "string",
            required: true,
            description: "could be even you. (only for Premium)",
            ui: {
              validate: (value) => {
                if (value !== "only for premium member") {
                  return "⚠️ only for Premium";
                }
              },
            },
          },
          {
            label: "👑 Solo",
            name: "solo",
            description: "Is this a solo event? - available only for Premium",
            type: "boolean",
            // ui: {
            // 	component: 'hidden',
            // },
            ui: {
              validate: (value) => {
                if (value !== true) {
                  return "⚠️ Turning this on is only for Premium";
                }
              },
            },
          },
          {
            label: "👑 In Home Page",
            description: "Add this item to home page",
            name: "inHome",
            type: "boolean",
            ui: {
              validate: (value) => {
                if (value === true) {
                  return "⚠️ Turning this on is only for Premium";
                }
              },
            },
          },
          {
            label: "👑 Location",
            name: "location",
            type: "object",
            fields: [
              {
                label: "👑 Line 1",
                name: "line1",
                type: "string",
                ui: {
                  validate: (value) => {
                    if (value?.length > 0) {
                      return "This field si only for Premium Member";
                    }
                  },
                },
              },
              {
                label: "👑 Line 2",
                name: "line2",
                type: "string",
                ui: {
                  validate: (value) => {
                    if (value?.length > 0) {
                      return "This field si only for Premium Member";
                    }
                  },
                },
              },
              {
                label: "👑 Post code",
                name: "postCode",
                type: "string",
                ui: {
                  validate: (value) => {
                    if (value?.length > 0) {
                      return "This field si only for Premium Member";
                    }
                  },
                },
              },
              {
                label: "👑 City",
                name: "city",
                type: "string",
                ui: {
                  validate: (value) => {
                    if (value?.length > 0) {
                      return "This field si only for Premium Member";
                    }
                  },
                },
              },

              {
                label: "👑 Link Direction",
                name: "linkDirection",
                type: "string",
                ui: {
                  validate: (value) => {
                    if (value?.length > 0) {
                      return "This field si only for Premium Member";
                    }
                  },
                },
              },
              {
                label: "👑 Map",
                name: "map",
                type: "string",
                ui: {
                  validate: (value) => {
                    if (value?.length > 0) {
                      return "This field si only for Premium Member";
                    }
                  },
                },
              },
            ],
          },

          {
            label: "👑 End date",
            name: "endDate",
            type: "string",
            description: "when event ends",
            ui: {
              validate: (value) => {
                if (value !== "May 23, 1976") {
                  return "⚠️ Changing this date is only for Premium (May 23, 1976)";
                }
              },
            },
            // ui: {
            // 	component: 'hidden',
            // },
          },
          {
            label: "👑 Hour format hh:mm",
            name: "hour",
            type: "string",
            description: "don`t use AM/PM use 16.00 or 10.30",
            ui: {
              validate: (value) => {
                if (value !== "only for premium member") {
                  return "⚠️ Changing this hour is only for Premium (only for premium member)";
                }
              },
            },
          },

          {
            label: "👑 Event Category",
            description: "⚠️ should be event",
            name: "eventCategory",
            type: "string",
            // ui: {
            // 	component: 'hidden',
            // },
          },
          {
            label: "👑 Layout",
            description: "only available for Premium Member",
            name: "layout",
            type: "string",
            ui: {
              validate: (value) => {
                if (value !== "exhibition") {
                  return "⚠️ Changing this is only for Premium Member (change back to exhibition)";
                }
              },
            },
            options: [
              {
                value: "exhibition",
                label: "exhibition",
              },
              {
                value: "event",
                label: "event",
              },
              {
                value: "market",
                label: "market",
              },
            ],
            // ui: {
            // 	component: 'hidden',
            // },
          },
        ],
      },
      {
        name: "artwork",
        label: "Artwork",
        path: "content/artwork",
        defaultItem: () => {
          return {
            layout: "artwork",
            date: new Date().toISOString(),
            title: "small caps please",
            siteMap: true,
            inHome: false,
            price: 0,
            weight: 0,
            stock: 0,
            creationDate: "May 23, 1976",
          };
        },
        // ui: {
        // 	filename: {
        // 		// if disabled, the editor can not edit the filename
        // 		readonly: true,
        // 		// Example of using a custom slugify function
        // 		slugify: (values) => {
        // 			// Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
        // 			return `${values?.title?.toLowerCase().replace(/ /g, '-')}`;
        // 		},
        // 	},
        // },
        fields: [
          {
            label: "Draft",
            name: "draft",
            type: "boolean",
          },
          {
            label: "Title",
            name: "title",
            type: "string",
            isTitle: true,
            required: true,
            description:
              "Keep it Brief - this will become link (~60 characters)",
            ui: {
              validate: (value) => {
                if (value === "small caps please") {
                  return "Change with a meaningful name small caps";
                } else {
                  if (value?.length > 65) {
                    return "file name cannot be more than 65 characters long as it becomes link to the page";
                  }
                }
              },
            },
          },
          {
            label: "Date",
            name: "date",
            type: "datetime",
            description: "this should be today",
            ui: {
              component: "hidden",
            },
          },
          {
            label: "Themes",
            name: "themes",
            type: "string",
            description: "Artwork subject",
            required: true,
            options: [
              {
                value: "abstract",
                label: "abstract",
              },
              {
                value: "figurtative",
                label: "figurtative",
              },
              {
                value: "others",
                label: "others",
              },
            ],
          },
          {
            label: "Technique used",
            name: "techniqueUsed",
            type: "string",
            ui: {
              validate: (value) => {
                if (value?.length > 40) {
                  return "Title cannot be more than 40 characters long";
                }
              },
            },
          },

          {
            label: "Dimensions",
            name: "dimensions",
            type: "object",
            description: "in centimeters",
            fields: [
              {
                label: "Height",
                name: "height",
                type: "number",
                description: "in cm",
                required: true,
                // ui: {
                // 	validate: (value) => {
                // 		if (typeof value !== 'number') {
                // 			return 'This should be a number';
                // 		}
                // 	},
                // },
              },
              {
                label: "Width",
                name: "width",
                type: "number",
                description: "in cm",
                required: true,
              },
              {
                label: "Thickness",
                name: "thickness",
                description: "in cm",
                type: "number",
              },
              {
                label: "Description",
                name: "dimensionDescription",
                description:
                  'a brief descripn woud be "single pannel" or "multipannel artwork", ~60 characters',
                type: "string",
                ui: {
                  validate: (value) => {
                    if (value?.length > 65) {
                      return "Title cannot be more than 40 characters long";
                    }
                  },
                },
              },
            ],
          },
          {
            label: "Body",
            name: "body",
            type: "rich-text",
            isBody: true,
          },
          {
            type: "object",
            label: "Images",
            name: "images",
            list: true,
            ui: {
              itemProps: (item) => {
                // Field values are accessed by item?.<Field name>
                return { label: item?.title };
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "image",
                name: "asset",
                label: "Asset",
                required: true,
              },
              {
                label: "👑 Type",
                name: "type",
                type: "string",
                description: "Premium Member Only",
                ui: {
                  // component: 'textarea',
                  validate: (value) => {
                    if (value !== "basic") {
                      return "This field si only for Premium Member, set to basic";
                    }
                  },
                },

                options: [
                  {
                    value: "basic",
                    label: "basic",
                  },
                  {
                    value: "details",
                    label: "details",
                  },
                  {
                    value: "sym",
                    label: "sym",
                  },
                  {
                    value: "full",
                    label: "full",
                  },
                ],
              },
            ],
          },

          {
            label: "Seo",
            name: "seo",
            type: "object",
            fields: [
              {
                label: "Title",
                name: "seo_title",
                type: "string",
                description:
                  "Title cannot be ~60 characters long as it becomes title of the page - (https://www.semrush.com/blog/title-tag/)",
                ui: {
                  validate: (value) => {
                    if (value?.length > 65) {
                      return "";
                    }
                  },
                },
              },
              {
                label: "Short name",
                name: "short_name",
                type: "string",
                description: "used in breadkrumbs -it will be deprecated",
              },
              {
                label: "👑 Description (for snippets)",
                name: "meta_description",
                type: "string",
                description:
                  "Premium Member Only - https://developers.google.com/search/docs/appearance/snippet#meta-descriptions",
                ui: {
                  component: "textarea",
                  validate: (value) => {
                    if (value?.length > 0) {
                      return "This field si only for Premium Member";
                    }
                  },
                },
              },
            ],
          },
          {
            label: "👑 When was created",
            name: "creationDate",
            type: "string",
            ui: {
              validate: (value) => {
                if (value !== "May 23, 1976") {
                  return "⚠️ Changing this date is only for Premium (May 23, 1976)";
                }
              },
            },
          },
          {
            label: "👑 In Home Page",
            description: "Add this item to home page",
            name: "inHome",
            type: "boolean",
            ui: {
              validate: (value) => {
                if (value === true) {
                  return "⚠️ Turning this on is only for Premium";
                }
              },
            },
          },
          {
            label: "👑 Materials",
            name: "materials",
            type: "string",
            ui: {
              validate: (value) => {
                if (value?.length > 0) {
                  return "Only for Premium Member";
                }
              },
            },
          },

          {
            label: "💰 Stock",
            name: "stock",
            type: "number",
            description: "Is this in stock",
            ui: {
              validate: (value) => {
                if (value > 0) {
                  return 'only for store owners / please set back to "0"';
                }
              },
            },
          },
          {
            label: "💰 Price",
            name: "price",
            type: "number",
            description: "is used only for store",
            ui: {
              validate: (value) => {
                if (value > 0) {
                  return 'only for store owners / please set back to "0"';
                }
              },
            },
          },

          {
            label: "💰 Weight",
            name: "weight",
            type: "number",
            description: "is used only for store",
            ui: {
              validate: (value) => {
                if (value > 0) {
                  return 'only for store owners / please set back to "0"';
                }
              },
            },
          },
          {
            label: "👑 Sitemap",
            description: "remove this page from siteamp",
            name: "siteMap",
            type: "boolean",
            ui: {
              validate: (value) => {
                if (value === false) {
                  return "⚠️ Turning this of is only for Premium";
                }
              },
            },
          },
          {
            label: "Layout",
            description: "⚠️ should be artwork",
            name: "layout",
            type: "string",
            ui: {
              component: "hidden",
            },
          },
        ],
      },
    ],
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN!,
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
