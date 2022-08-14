// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    spacing: { xxs: 2; xs: 4; s: 8; m: 12; l: 16; xl: 20; xxl: 24 };
  }
}
