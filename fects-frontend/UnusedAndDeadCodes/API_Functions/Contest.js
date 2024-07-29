
const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
    videos: [],
    startDate: "",
    finishDate: "",
    assetType: "",
    tags: [
      {
        name: "",
        createdBy: "",
      }
    ],
    socialMedia: [
      {
        socialMediaName: "",
        link: "",
        username: "",
        name: ""
      }
    ],
    pastReference: [0],
    pastImages: [{}],
    pastVideos: [{}],
    maxAssetSize: 0,
    maxAssetSizeUnit: "",
    visibility: "",
    rules: [""],
    copyRights: "",
    prizes: [
      {
        name: "",
        description: "",
        giveaway: ""
      }
    ],
    participants: [
      {
        id: 0,
        firstName: "",
        lastName: "",
        username: "string",
        email: "string",
        password: "string",
        address: {
          addressOne: "string",
          addressTwo: "string",
          city: "string",
          state: "string",
          zipCode: "string",
          county: "string",
          country: "string"
        },
        images: [
          {
            id: 0,
            name: "string",
            systemName: "string",
            filePath: "string",
            description: "string",
            globalPath: "string",
            onPremise: true,
            resolution: "string",
            type: "string",
            createdBy: "string",
            createdDate: "2024-07-25T15:57:01.983Z",
            updateDate: "2024-07-25T15:57:01.983Z",
            transactionId: "string"
          }
        ],
        phone: {
          phoneNumber: "string",
          phoneType: "LANDLINE"
        },
        gender: "MALE",
        maritalStatus: "MARRIED",
        birthdate: "2024-07-25T15:57:01.983Z",
        status: "ACTIVE",
        tokenExpired: true,
        accountNotExpired: true,
        accountNotLocked: true,
        credentialNotExpired: true,
        createdBy: "string",
        createdDate: "2024-07-25T15:57:01.983Z",
        updateDate: "2024-07-25T15:57:01.983Z",
        transactionId: "string",
        roles: [
          {
            id: 0,
            name: "string",
            users: [
              "string"
            ],
            privileges: [
              {
                id: 0,
                name: "string",
                roles: [
                  "string"
                ],
                createdBy: "string",
                createdDate: "2024-07-25T15:57:01.983Z",
                updateDate: "2024-07-25T15:57:01.983Z",
                transactionId: "string"
              }
            ],
            createdBy: "string",
            createdDate: "2024-07-25T15:57:01.983Z",
            updateDate: "2024-07-25T15:57:01.983Z",
            transactionId: "string"
          }
        ],
        monthlyNewsletterSubscription: true,
        allowPrivateMessages: true,
        allowNotificationWhenSomeoneComments: true,
        allowNotificationWhenSomeoneLikes: true,
        token: "string",
        authorities: [
          {
            authority: "string"
          }
        ],
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        enabled: true
      }
    ],
    participantsRight: "",
    participantMaxAssetSize: "",
    participantMaxAssetSizeUnit: "",
    participantMaxAssetAllowed: "",
    participantThankyouMessage: "",
    judges: [
      {
        id: 0,
        firstName: "string",
        lastName: "string",
        username: "string",
        email: "string",
        password: "string",
        address: {
          addressOne: "string",
          addressTwo: "string",
          city: "string",
          state: "string",
          zipCode: "string",
          county: "string",
          country: "string"
        },
        images: [
          {
            id: 0,
            name: "string",
            systemName: "string",
            filePath: "string",
            description: "string",
            globalPath: "string",
            onPremise: true,
            resolution: "string",
            type: "string",
            createdBy: "string",
            createdDate: "2024-07-25T15:57:01.983Z",
            updateDate: "2024-07-25T15:57:01.983Z",
            transactionId: "string"
          }
        ],
        phone: {
          phoneNumber: "string",
          phoneType: "LANDLINE"
        },
        gender: "MALE",
        maritalStatus: "MARRIED",
        birthdate: "2024-07-25T15:57:01.983Z",
        status: "ACTIVE",
        tokenExpired: true,
        accountNotExpired: true,
        accountNotLocked: true,
        credentialNotExpired: true,
        createdBy: "string",
        createdDate: "2024-07-25T15:57:01.983Z",
        updateDate: "2024-07-25T15:57:01.983Z",
        transactionId: "string",
        roles: [
          {
            id: 0,
            name: "string",
            users: [
              "string"
            ],
            privileges: [
              {
                id: 0,
                name: "string",
                roles: [
                  "string"
                ],
                createdBy: "string",
                createdDate: "2024-07-25T15:57:01.983Z",
                updateDate: "2024-07-25T15:57:01.983Z",
                transactionId: "string"
              }
            ],
            createdBy: "string",
            createdDate: "2024-07-25T15:57:01.983Z",
            updateDate: "2024-07-25T15:57:01.983Z",
            transactionId: "string"
          }
        ],
        monthlyNewsletterSubscription: true,
        allowPrivateMessages: true,
        allowNotificationWhenSomeoneComments: true,
        allowNotificationWhenSomeoneLikes: true,
        token: "string",
        authorities: [
          {
            authority: "string"
          }
        ],
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        enabled: true
      }
    ],
    ratingCriteria: "",
    ratings: [
      {
        ratingCriteria: "",
        weitage: 0,
        weitageUnit: "",
        createdBy: "",
      }
    ],
    createdBy: ""
  })
  