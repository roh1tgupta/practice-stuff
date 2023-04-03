
const resolvers = {
  Character: {
    __resolveType(character, context, info) {
      if (character.species) {
        return "NonHuman";
      }

      if (!character.species) {
        return "Human";
      }

      return null;
    },
  },
  Human: {
    wand(parent, __, { wands }) {
      return wands.find((item) => item.character_id === parent.id);
    },
  },
  Wand: {
    length(parent) {
      return parent.length ?? 0;
    },
  },
  Query: {
    humans(_, __, { characters }) {
      return characters;
    },
    human(_, { id }, { characters }) {
      return characters.find((chr) => id === chr.id);
    },
    nonHumans(_, __, { characters }) {
      return characters.filter(chr => chr.species);
    },
    characters(_, __, { characters }) {
      return characters;
    },
  },
  Mutation: {
    async createCharacter(_, { data }, { Character }) {
      id = (await Character.count()) + 1;
      data = { ...data, id };
      return await Character.create(data);
    },
  },
};

module.exports = resolvers;