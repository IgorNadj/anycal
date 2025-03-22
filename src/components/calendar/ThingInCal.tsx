import { Thing } from "../../types/types.ts";
import styled from "styled-components";

const StyledThingInCal = styled.span`
  border: 1px solid yellow;
  background: #f3d6a1;
  padding: 0.25em 0.5em;
  border-radius: 0.5em;
`;

export const ThingInCal = ({ thing }: { thing: Thing }) => (
  <StyledThingInCal key={thing.uuid}>{thing.name}</StyledThingInCal>
);
