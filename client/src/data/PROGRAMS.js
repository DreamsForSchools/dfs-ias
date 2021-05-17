import { getRandomInstructorSet } from "../util/sampleData";

export const PROGRAMS = [
    {
        id: "1",
        name: "WebJam",
        color: "#40CCC8",
        logo: "https://i.ibb.co/T8kL0pM/Web-Dev-Logo.png",
        classes: [
            {
                id: "1",
                partner: "Villa Fundamental",
                type: "Private",
                time: [
                    {
                        weekday: 1,
                        startTime: "12:00:00",
                        endTime: "14:00:00"
                    },
                    {
                        weekday: 3,
                        startTime: "12:00:00",
                        endTime: "14:00:00"
                    }
                ],
                instructorCount: 10,
                slotCount: 10,
                instructors: [],
            },
            {
                id: "2",
                partner: "Villa Fundamental",
                type: "Private",
                time: [
                    {
                        weekday: 2,
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    },
                    {
                        weekday: 4,
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    }
                ],
                instructorCount: 5,
                slotCount: 10,
                instructors: [],
            },
            {
                id: "3",
                partner: "Fremont Fundamental",
                type: "Public",
                district: "SAUSD",
                time: [
                    {
                        weekday: 3,
                        startTime: "10:00:00",
                        endTime: "12:00:00"
                    },
                    {
                        weekday: 5,
                        startTime: "10:00:00",
                        endTime: "12:00:00"
                    }
                ],
                instructorCount: 8,
                slotCount: 10,
                instructors: [],
            }
        ]
    },
    {
        id: "2",
        name: "AppJam",
        color: "#BB6BD9",
        logo: "https://i.ibb.co/fHqN0fD/Mobile-Dev-Logo.png",
        classes: [
            {
                id: "4",
                partner: "Villa Fundamental",
                type: "Private",
                time: [
                    {
                        weekday: 1,
                        startTime: "14:00:00",
                        endTime: "17:00:00"
                    }
                ],
                instructorCount: 3,
                slotCount: 5,
                instructors: [],
            },
            {
                id: "5",
                partner: "Peter The Anteater High School",
                type: "Public",
                district: "LBUSD",
                time: [
                    {
                        weekday: 2,
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    },
                    {
                        weekday: 4,
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    }
                ],
                instructorCount: 5,
                slotCount: 5,
                instructors: [],
            }
        ]
    },
    {
        id: "3",
        name: "Engineering Inventors",
        color: "#4B4B92",
        logo: "https://i.ibb.co/Pwt1yG3/EFKLogo.png",
        classes: [
            {
                id: "6",
                partner: "Edison Elementary School",
                type: "Public",
                district: "LBUSD",
                time: [
                    {
                        weekday: 2,
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    },
                    {
                        weekday: 4,
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    }
                ],
                instructorCount: 5,
                slotCount: 5,
                instructors: [],
            },
            {
                id: "7",
                partner: "Irvine Community Center",
                type: "Housing",
                time: [
                    {
                        weekday: 2,
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    },
                    {
                        weekday: 4,
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    }
                ],
                instructorCount: 5,
                slotCount: 5,
                instructors: [],
            },
            {
                id: "8",
                partner: "Gerald P. Carr Intermediate",
                type: "Non-profit",
                time: [
                    {
                        weekday: 2,
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    },
                    {
                        weekday: 4,
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    }
                ],
                instructorCount: 5,
                slotCount: 5,
                instructors: [],
            }
        ]
    },
    {
        id: "4",
        name: "LESTEM",
        color: "#F2994A",
        logo: "https://i.ibb.co/Jng1xMw/LESTEMLogo.png",
        classes: [
            {
                id: "9",
                partner: "Edison Elementary School",
                type: "Public",
                district: "LBUSD",
                time: [
                    {
                        weekday: 1,
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    },
                    {
                        weekday: 3,
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    },
                    {
                        weekday: 5,
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    }
                ],
                instructorCount: 5,
                slotCount: 5,
                instructors: [],
            }
        ]
    },
    {
        id: "5",
        name: "Scratch",
        color: "#F2C94C",
        logo: "https://i.ibb.co/bFW9VZW/Scratch-Logo.png",
        classes: [
            {
                id: "10",
                partner: "Edison Elementary School",
                type: "Public",
                district: "LBUSD",
                time: [
                    {
                        weekday: 1,
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    },
                    {
                        weekday: 3,
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    },
                    {
                        weekday: 5,
                        startTime: "16:00:00",
                        endTime: "18:00:00"
                    }
                ],
                instructorCount: 5,
                slotCount: 8,
                instructors: [],
            }
        ]
    },
]

export const PROGRAM_COLOR_KEYS = {
    "AppJam": "#BB6BD9",
    "WebJam": "#40CCC8",
    "LESTEM": "#F2994A",
    "Engineering Inventors": "#4B4B92",
    "Scratch": "#F2C94C",
    "Mobile App Development (AppJam+)": "#BB6BD9",
    "Website Development": "#40CCC8",
    "Let's Explore STEM": "#F2994A",
    "Coding Games with Scratch": "#F2C94C",
};