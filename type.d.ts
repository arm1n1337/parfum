type autoCompletion<T extends string> = T | (string & {});

type Jahr = autoCompletion<"Frühling" | "Sommer" | "Herbst" | "Winter" | "Ganzjährig">;
type Anlass = autoCompletion<"Tagsüber" | "Abends" | "Alltag" | "Ganztägig" | "Formell" | "Sportlich" | "Luxeriös" | "Ausgehen" | "Elegant" | "Anlass" | "Leger" | "Frisch">;

type ParfumType = {
    [x: string]: {
        Alle: Set<string>;
        Duftnoten?: Set<string>;
        Kopfnoten?: Set<string>;
        Herznoten?: Set<string>;
        Basisnoten?: Set<string>;
        Jahreszeit?: Set<Jahr>;
        Anlass?: Set<Anlass>;
    };
};