import { TeamMember } from "../types";

export class Team {
  constructor(public id: string, public members: TeamMember[], public score: number = 0) {
  }

  addMember = (member: TeamMember): void => {
    this.members = [...this.members, member];
  }

  addScore = (): void => {
    this.score += 1;
  }
}