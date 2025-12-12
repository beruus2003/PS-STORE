import { Link } from "wouter";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import logoUrl from "@assets/PS_STORE_1765393444481.jpg";

export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoUrl}
                alt="PS Store"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-bold">PS Store</h3>
                <p className="text-sm text-muted-foreground">Multimarcas</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Sua loja multimarcas com os melhores produtos e preços do mercado.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Início
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/produtos">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Produtos
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/categorias">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Categorias
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Rua Exemplo, 123 - Centro
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  (85) 996013299
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  contato@psstore.com
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Horário de Funcionamento</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Seg - Sex: 9h às 18h
                </span>
              </li>
              <li className="text-sm text-muted-foreground pl-6">
                Sáb: 9h às 13h
              </li>
              <li className="text-sm text-muted-foreground pl-6">
                Dom: Fechado
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PS Store. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
