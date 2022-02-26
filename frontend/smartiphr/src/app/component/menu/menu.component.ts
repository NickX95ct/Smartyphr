import { Component, OnInit } from "@angular/core";
import { Dipendenti } from "src/app/models/dipendenti";
import { Menu } from "src/app/models/menu";
import { SubMenu } from "src/app/models/subItem";
import { User } from "src/app/models/user";
import { AuthenticationService } from "src/app/service/authentication.service";
import { MenuService } from "src/app/service/menu.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {
  menu: Menu[];
  mansione: string;

  constructor(
    public menuService: MenuService,
    private authenticationService: AuthenticationService
  ) {
    this.menu = [];
  }

  ngOnInit() {
    if (this.authenticationService.isAuthenticated()) {
      this.menuService.getMenu().subscribe((items: Menu[]) => {
        this.menu = items.sort((a: Menu, b: Menu) => a.order - b.order);
        console.log("Menu", this.menu);
      }, err=> {
        console.error("Error", err);
      });
    }

    this.authenticationService.getCurrentUserAsync().subscribe((user: User) => {
      if (user !== undefined && user !== null) {
        const userId = user._id;
        console.log("userId", userId);
        this.authenticationService
        .getInfo(userId)
        .subscribe((dipendente: Dipendenti[]) => {
          console.log("dipendente", dipendente);
          if (dipendente.length === 1) {
            this.mansione = dipendente[0].mansione;
          }
        });
      } else {
        console.log("User not logged");
      }
    });
  }

  closeAllSubItem(subMenu: SubMenu[]) {
    console.log("Close All sub Items");

    subMenu.map((x) => (x.status = false));
  }
}
