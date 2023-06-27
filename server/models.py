from dataclasses import dataclass
from typing import Optional, List, Dict
@dataclass
class User:
    sid: str
    ready: bool = False
    team: bool = False
    camera_ready: bool = False

@dataclass
class Room:
    id: str
    name: str
    tags: List[str]
    teams: bool
    team_names: List[str]
    room_size: int
    time_to_start: float
    allow_spectators: bool
    users_list: Dict[str, User]
    spectators_list: Dict[str, User]
    moderator: str
    is_conversation: bool
    pictureId: Optional[int]
    user_reports: Dict[str, List[str]]
    blacklist: List[str]